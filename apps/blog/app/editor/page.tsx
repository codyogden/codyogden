import TiptapEditor from './TiptapEditor'

export default async function EditorPage() {
    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Editor</h1>
            <TiptapEditor />
        </div>
    );
}