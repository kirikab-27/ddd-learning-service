import { CourseLayout } from '@/presentation/layouts/CourseLayout';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  // TODO: CourseSidebar will be implemented by another worker
  const placeholderSidebar = (
    <div style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>
      <p>Course: {courseId}</p>
      <p>Sidebar content coming soon...</p>
    </div>
  );

  return (
    <CourseLayout sidebar={placeholderSidebar}>
      {children}
    </CourseLayout>
  );
}
