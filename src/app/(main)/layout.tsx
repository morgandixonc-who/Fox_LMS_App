import Sidebar from '@/components/Sidebar';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
            <Sidebar />
            <main style={{ marginLeft: 'var(--sidebar-width)', flex: 1, padding: '40px' }}>
                {children}
            </main>
        </div>
    );
}
