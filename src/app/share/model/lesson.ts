
export class Lesson {

  constructor(
    public $key: string,
    public courseId: string,
    public description: string,
    public duration: string,
    public longDescription: string,
    public url: string,
    public videoUrl: string,
    public tags: string
  ){}

  static fromJsonList(array): Lesson[] {
      return array.map(Lesson.fromJson);
  }

  static fromJson({$key, courseId, description, duration, longDescription, url, videoUrl, tags}): Lesson {
      return new Lesson($key, courseId, description, duration, longDescription, url, videoUrl, tags);
  }
}
