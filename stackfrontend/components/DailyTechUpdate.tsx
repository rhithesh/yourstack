export default function DailyTechUpdate() {
    const updates = [
        "AI models are getting smaller and faster! Distillation is the new trend.",
        "Rust is becoming the go-to language for high-performance systems.",
        "Quantum computing is inching closer to practical application with new error correction methods.",
        "WebAssembly is enabling desktop-class applications in the browser.",
        "The future of coding is agentic AI assistants working alongside developers."
    ];

    // Simple random selection for now, could be based on date
    const update = updates[Math.floor(Math.random() * updates.length)];

    return (
        <div className="mb-12 p-1 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x">
            <div className="bg-card rounded-xl p-6 text-center">
                <h2 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    Daily Tech Update
                </h2>
                <p className="text-lg text-foreground font-medium">
                    {update}
                </p>
            </div>
        </div>
    );
}
