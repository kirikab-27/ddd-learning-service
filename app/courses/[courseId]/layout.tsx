import { CourseLayout } from '@/presentation/layouts/CourseLayout';
import { CourseSidebar } from '@/presentation/features/navigation/CourseSidebar';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return (
    <CourseLayout sidebar={<CourseSidebar courseId={courseId} />}>
      {children}
    </CourseLayout>
  );
}
