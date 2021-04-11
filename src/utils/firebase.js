


const querySnapshopToArray = (snapshot) => {
  let result = [];
  snapshot.forEach(each => {
   

      result.push({
          ...each.data(),
          id: each.id
      });
  })
  return result;
};
const FireBaseUtilities = {
    querySnapshopToArray
}
export default FireBaseUtilities;