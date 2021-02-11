import * as actions from './actions'

describe('actions', () => {
  it('should have a type of SET_STYLE', () => {
    const style = "preppy"
    const user = {id: 1, name: 'User', role: 'USER', email: 'user@crate.com' }
    const expectedAction = {
      type: 'SET_STYLE',
      details: user,
    }
    const result = actions.setUserStyle(user, style)
    expect(result).toEqual(expectedAction)
  })
})