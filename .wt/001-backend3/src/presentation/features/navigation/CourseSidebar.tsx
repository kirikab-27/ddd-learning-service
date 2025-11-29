'use client';

import { useParams } from 'next/navigation';
import { useCourseNavigation } from '@/presentation/hooks/useCourseNavigation';
import { ChapterNav } from './ChapterNav';
import styles from './CourseSidebar.module.css';

interface CourseSidebarProps {
  courseId: string;
}

export function CourseSidebar({ courseId }: CourseSidebarProps) {
  const params = useParams();
  const currentLessonId = params?.lessonId as string | undefined;

  const { data, isLoading, error } = useCourseNavigation({
    courseId,
    currentLessonId,
  });

  if (isLoading) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

  if (error || !data) {
    return <div className={styles.error}>ナビゲーションを読み込めませんでした</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.courseHeader}>
        <h2 className={styles.courseTitle}>{data.courseTitle}</h2>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${data.completionRate}%` }}
          />
        </div>
        <span className={styles.progressText}>{data.completionRate}% 完了</span>
      </div>

      <nav className={styles.nav}>
        {data.chapters.map(chapter => (
          <ChapterNav
            key={chapter.id}
            courseId={courseId}
            chapter={chapter}
          />
        ))}
      </nav>
    </div>
  );
}
