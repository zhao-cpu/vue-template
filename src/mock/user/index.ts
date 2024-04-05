export default [
  {
    url: '/api/users',
    method: 'get',
    timeout: 2000,
    response: () => {
      return {
        code: 0,
        msg: 'success',
        'data|1-10': [
          {
            id: '@id()',
            name: '@cname()',
            'age|1-100': 1,
            'status|1': [0, 1]
          }
        ]
      }
    }
  }
]
