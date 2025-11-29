'use client';

import { use } from 'react';
import { CourseDetail } from '@/presentation/features/course';
import { useCourseNavigation } from '@/presentation/hooks/useCourseNavigation';

interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

// Course descriptions (could be fetched from a repository in the future)
const courseDescriptions: Record<string, string> = {
  'course-ddd-basics': 'ドメイン駆動設計の基礎を学ぶコースです。値オブジェクト、エンティティ、集約などの概念を実践的に理解します。',
};

export default function CoursePage({ params }: CoursePageProps) {
  const { courseId } = use(params);
  const { data, isLoading, error } = useCourseNavigation({ courseId });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-400">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-400">エラーが発生しました: {error.message}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-400">コースが見つかりません</div>
      </div>
    );
  }

  const description = courseDescriptions[courseId] || '';

  return <CourseDetail data={data} description={description} />;
}
