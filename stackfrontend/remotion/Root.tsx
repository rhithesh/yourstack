import { Composition } from 'remotion';
import NewsletterVideo from './NewsletterVideo';

export const RemotionRoot = () => {
    return (
        <>
            <Composition
                id="NewsletterVideo"
                component={NewsletterVideo}
                durationInFrames={300}
                fps={30}
                width={1080}
                height={1080}
            />
        </>
    );
};