<input
  {...register("test", {
    validate: (value, formValues) => value === '1'
  })}
/>
// object of callback functions
<input
  {...register("test1", {
    validate: {
      positive: v => parseInt(v) > 0,
      lessThanTen: v => parseInt(v) < 10,
      validateNumber: (_, values) =>
        !!(values.number1 + values.number2), 
      checkUrl: async () => await fetch(),
    }
  })}
/>