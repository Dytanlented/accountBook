test('test equal',()=>{
	expect(2+2).toBe(4)
})
test('test not equal',()=>{
	expect(2+2).not.toBe(5)
})
test('test to be true or false',()=>{
	expect(1).toBeTruthy()
	expect(0).toBeFalsy()
})
test('test number',()=>{
	expect(4).toBeGreaterThan(3)
	expect(5).toBeLessThan(9)
})
test('test object',()=>{
	expect({name:'Yanting'}).toEqual({name:'Yanting'})
})
