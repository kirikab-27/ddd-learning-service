import { Course } from '@/domain/content/models/Course';
import { CourseId } from '../CourseId';

/**
 * コースリポジトリのインターフェース
 * ドメイン層で定義し、インフラ層で実装する
 */
export interface ICourseRepository {
  /**
   * IDでコースを検索する
   */
  findById(id: CourseId): Promise<Course | null>;

  /**
   * 全コースを取得する
   */
  findAll(): Promise<Course[]>;
}
