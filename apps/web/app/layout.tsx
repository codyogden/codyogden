export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head />
            <body style={{
                fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
            }}>{children}</body>
        </html>
    );
}
