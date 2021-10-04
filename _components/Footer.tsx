import { useRouter } from 'next/router';

export default function Footer() {
    const { pathname } = useRouter();
    if(pathname === '/')
        return <></>;
    return (
        <footer>
            Footer
            <style jsx>{`
                footer {
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    box-sizing: border-box;
                    padding: 0 1rem 1rem 0;
                }
                @media screen and ( max-width: 65ch ) {
                    footer {
                        position: static;
                    }
                }
            `}</style>
        </footer>
    );
}
