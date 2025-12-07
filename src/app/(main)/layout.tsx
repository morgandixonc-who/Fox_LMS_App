import Sidebar from '@/components/Sidebar';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="main-layout-container">
            <Sidebar />
            <main className="main-content">
                {children}
            </main>
        </div>
    );
}
