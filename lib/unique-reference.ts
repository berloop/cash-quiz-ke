export function generateUniqueReference(): string {
    // Get the current timestamp (in milliseconds)
    const timestamp: number = new Date().getTime();
  
    // Generate a random number between 1000 and 9999
    const random: number = Math.floor(Math.random() * 9000) + 1000;
  
    // Combine the timestamp and random number to create a unique reference
    const reference: string = `${timestamp}${random}`;
    console.log(reference);
  
    return reference;
  }
  