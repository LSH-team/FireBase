
export class Course {

  constructor(
    public $key: string,
    public courseListIcon: string,
    public description: string,
    public iconUrl: string,
    public longDescription: string,
    public url: string
  ){}

  static fromJsonList(array): Course[] {
    return array.map(Course.fromJson);
  }

  static fromJson({$key,courseListIcon, description,iconUrl, longDescription, url }): Course {
    return new Course($key, courseListIcon, description, iconUrl, longDescription, url);
  }
}
