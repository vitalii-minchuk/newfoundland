import { auth, signOut } from "@/auth"
import { SendTestingEmailBtn } from "@/components/email/send-test-email-btn"

export default async function Settings() {
    const session = await auth()
    
    const handleSignOut = async () => {
        "use server"
        
        await signOut()
    }

    return (
        <div>
            {JSON.stringify(session)}
            <form action={handleSignOut}>
                <button type='submit'>out</button>
            </form>
            <SendTestingEmailBtn />
        </div>
    )
}