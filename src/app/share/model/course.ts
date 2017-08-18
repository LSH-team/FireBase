
export class Course {

  constructor(
    public key: string,
    public title: string,
    public url: string,
    public description: string,
  ){}

  static fromJsonList(array): Course[] {
    return array.map(Course.fromJson);
  }

  static fromJson({key, title, description, url}): Course {
    return new Course(key, title, description, url);
  }
}
