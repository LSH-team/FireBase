
export class Course {

  constructor(
    public title: string,
    public description: string,
  ){}

  get isFirst() {
    return this.title;
  }

  static fromJsonList(array): Course[] {
    return array.map(Course.fromJson);
  }

  static fromJson({title, description}): Course {
    return new Course(title, description);
  }
}
