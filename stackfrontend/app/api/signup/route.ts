export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
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

        await transporter.sendMail({
            from: `"YOURSTACK" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'YOURSTACK — Welcome to Our Newsletter 🚀',
            html: emailHtml,
        });

        return NextResponse.json(
            { message: 'Signup successful, welcome email sent.' },
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