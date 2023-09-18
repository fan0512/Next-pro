import Link from 'next/link'

export default function Footer() {
    return(
        <>
            <div className="footer">
                <p><Link href="/">home</Link></p>
                <p><Link href="/about">about</Link></p>
                <p>A big thanks to <a href="https://giphy.com/">giphy.com</a> for letting us use ther API!</p>
            </div>
        </>
    )
}