
export class Lesson {

  constructor(
    public $key: string,
    public title: string,
    public hour: number,
    public description: string
  ){}

  get isFirst() {
      return this.title + '/';
  }

  static fromJsonList(array): Lesson[] {
      return array.map(Lesson.fromJson);
  }

  static fromJson({$key, title, hour, description}): Lesson {
      return new Lesson($key, title, hour, description);
  }
}
