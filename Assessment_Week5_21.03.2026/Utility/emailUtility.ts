export function generateEmail(): string {
    const timestamp = Date.now();
    return `testuser_${timestamp}@mail.com`;
}