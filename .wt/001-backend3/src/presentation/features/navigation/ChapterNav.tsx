'use client';

import { useState } from 'react';
import { LessonNav } from './LessonNav';
import styles from './ChapterNav.module.css';

interface ChapterNavProps {
  courseId: string;
  chapter: {
    id: string;
    title: string;
    order: number;
    lessons: Array<{
      id: string;
      title: string;
      order: number;
      isCompleted: boolean;
      isUnlocked: boolean;
      isCurrent: boolean;
    }>;
    isExpanded: boolean;
  };
}

export function ChapterNav({ courseId, chapter }: ChapterNavProps) {
  const [isExpanded, setIsExpanded] = useState(chapter.isExpanded);

  const completedCount = chapter.lessons.filter(l => l.isCompleted).length;
  const totalCount = chapter.lessons.length;

  return (
    <div className={styles.chapter}>
      <button
        className={styles.header}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</span>
        <span className={styles.title}>
          {chapter.order}. {chapter.title}
        </span>
        <span className={styles.progress}>
          {completedCount}/{totalCount}
        </span>
      </button>

      {isExpanded && (
        <div className={styles.lessons}>
          {chapter.lessons.map(lesson => (
            <LessonNav
              key={lesson.id}
              courseId={courseId}
              chapterId={chapter.id}
              lesson={lesson}
            />
          ))}
        </div>
      )}
    </div>
  );
}
