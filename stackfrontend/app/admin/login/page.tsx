import { login } from '../actions';

export default function AdminLogin() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
            <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-2xl border border-border">
                <h1 className="text-3xl font-bold mb-6 text-center text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Admin Access
                </h1>
                <form action={login} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-2 text-muted-foreground">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="w-full p-4 rounded-xl bg-input border border-input-border focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300 text-lg"
                            placeholder="Enter admin password..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-lg shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1 transition-all duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
