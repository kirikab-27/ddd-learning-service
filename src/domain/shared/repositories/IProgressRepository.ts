import { Progress } from '@/domain/progress/models/Progress';
import { CourseId } from '../CourseId';

/**
 * 進捗リポジトリのインターフェース
 * ドメイン層で定義し、インフラ層で実装する
 */
export interface IProgressRepository {
  /**
   * コースIDで進捗を検索する
   */
  findByCourseId(courseId: CourseId): Promise<Progress | null>;

  /**
   * 進捗を保存する
   */
  save(progress: Progress): Promise<void>;
}
