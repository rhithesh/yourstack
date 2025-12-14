export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';
import { render } from '@react-email/render';
import WelcomeEmail from '@/components/emails/WelcomeEmail';
import React from 'react';

export async function POST(request: Request) {
    try {
        const { email, platforms, interests, style } = await request.json();

        // Validation
        if (!email || !platforms?.length || !interests?.length || !style) {
            return NextResponse.json(
                { error: 'Invalid payload' },
                { status: 400 }
            );
        }

        // Check environment variables
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Missing EMAIL_USER or EMAIL_PASS environment variables');
            return NextResponse.json(
                { error: 'Email configuration error' },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Render email HTML - fixed spacing in JSX
        const emailHtml = await render(
            React.createElement(WelcomeEmail, {
                platforms,
                interests,
                style,
            })
        );

        // Store in database
        try {
            await prisma.subscriber.create({
                data: {
                    email,
                    platforms,
                    interests,
                    style,
                    creators: [], // Default empty as per plan
                },
            });
        } catch (error: any) {
            // P2002 is Prisma's unique constraint violation code
            if (error.code === 'P2002') {
                return NextResponse.json(
                    { error: 'Email already subscribed' },
                    { status: 409 }
                );
            }
            throw error; // Let the outer catch handle other DB errors
        }

        await transporter.sendMail({
            from: `"YOURSTACK" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'YOURSTACK — Welcome to Our Newsletter 🚀',
            html: emailHtml,
        });

        // Trigger Kestra Workflow
        try {
            const formData = new FormData();

            // Derive name from email (e.g., "hithesh" from "hithesh@example.com")
            const derivedName = email.split('@')[0];

            formData.append('email', email);
            formData.append('name', derivedName);
            formData.append('platforms', JSON.stringify(platforms));
            // Map 'interests' to 'intrests' key as expected by Kestra
            formData.append('intrests', JSON.stringify(interests));
            // Map 'style' to 'tone'
            formData.append('tone', style.toLowerCase());

            console.log('Triggering Kestra workflow for:', email);

            // Fire and forget - or await if you want to ensure it triggered
            // Using await to log success/failure
            const kestraResponse = await fetch('http://localhost:8080/api/v1/main/executions/company.team/daily_newsletter', {
                method: 'POST',
                body: formData, // fetch automatically sets Content-Type to multipart/form-data with boundary
            });

            if (kestraResponse.ok) {
                const kestraData = await kestraResponse.json();
                console.log('Kestra workflow triggered successfully:', kestraData.id);
            } else {
                const text = await kestraResponse.text();
                console.error('Failed to trigger Kestra workflow:', kestraResponse.status, text);
            }

        } catch (error) {
            console.error('Error triggering Kestra workflow:', error);
            // We don't block the user signup if Kestra fails, but we log it.
        }

        return NextResponse.json(
            { message: 'Signup successful, stored in DB, Kestra triggered, and welcome email sent.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send welcome email.' },
            { status: 500 }
        );
    }
}