interface Udo {
  id: number;
  name: string;
}

function isUdo(obj: any): obj is Udo {
  return obj.name !== undefined;
}
