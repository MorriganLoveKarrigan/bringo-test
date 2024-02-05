function generateUniqueId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (character) {
    const randomNumber = (Math.random() * 16) | 0,
      value = character === 'x' ? randomNumber : (randomNumber & 0x3) | 0x8;
    return value.toString(16);
  });
}

export default generateUniqueId();
