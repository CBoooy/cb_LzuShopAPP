let postOrder = async () => {
  let result = await Axios({
    method: 'post',
    url: `https://www.fastmock.site/mock/6ce9d2ceaed88cae5a13592139cd7aaa/study/order`,
    params: {
      name: 'cboy'
    }
  })
  if (result.data.error === 0) {


    let clearCart = () => {
      store2.commit('clearCart', {
        shopsid: props.shopsid
      })
    }
    clearCart()
    ctx.$root.$router.back()

  }

}

export default postOrder;
