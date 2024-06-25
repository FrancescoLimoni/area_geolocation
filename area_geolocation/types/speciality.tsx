interface Speciality {
  id: number;
  code: string;
  name: string;
}

function isSpecility(obj: any): obj is Speciality {
  return obj.code !== undefined;
}
