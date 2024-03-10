import { auth, signOut } from "@/auth"

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
        </div>
    )
}