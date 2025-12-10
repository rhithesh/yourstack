import { createPost } from '../actions';

export default function CreatePost() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
            <div className="w-full max-w-2xl bg-card p-8 rounded-2xl shadow-2xl border border-border">
                <h1 className="text-3xl font-bold mb-6 text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Share Your Knowledge
                </h1>
                <form action={createPost} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-2 text-muted-foreground">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="w-full p-4 rounded-xl bg-input border border-input-border focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300 text-lg"
                            placeholder="Enter an engaging title..."
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium mb-2 text-muted-foreground">
                            Category
                        </label>
                        <div className="relative">
                            <select
                                id="category"
                                name="category"
                                required
                                className="w-full p-4 rounded-xl bg-input border border-input-border focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none appearance-none transition-all duration-300 text-lg cursor-pointer"
                            >
                                <option value="" disabled selected>Select a category</option>
                                <option value="AI">Artificial Intelligence</option>
                                <option value="Software-engineering">Software Engineering</option>
                                <option value="research-breakthroughs">Research Breakthroughs</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium mb-2 text-muted-foreground">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            required
                            rows={10}
                            className="w-full p-4 rounded-xl bg-input border border-input-border focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300 text-lg resize-y"
                            placeholder="Write your thoughts here..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-lg shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1 transition-all duration-300"
                    >
                        Submit for Review
                    </button>
                </form>
            </div>
        </div>
    );
}
