describe('greeter function', () => {
  const name = 'John';
  let hello: string;

  let timeoutSpy: jest.SpyInstance;

  // Act before assertions
  beforeAll(() => {
    console.log('beforeAll');
  });

  // Teardown (cleanup) after assertions
  afterAll(() => {
    timeoutSpy.mockRestore();
  });

  // Assert if setTimeout was called properly
  it('delays the greeting by 2 seconds', () => {
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  // Assert greeter result
  it('greets a user with `Hello, {name}` message', () => {
    expect(hello).toBe(`Hello, ${name}`);
  });
});
