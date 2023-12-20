const reducer = (state, action) => {
  if (action.type === "SET_GAME_DATA") {
    // console.log("triggered");
    return {
      ...state,
      allGames: action.payload,
      filterdData: action.payload,
    };
  }
  if (action.type === "SEARCH") {
    //Return a new state object with "searchedData"bset to the provided payload
    const searchQuery = action.payload.toLowerCase();

    let searchedData = state.allGames?.filter((singleGame) => {
      //Filter games based on search term
      const lowerName = singleGame.name.toLowerCase();
      return lowerName.includes(searchQuery);
    });
    searchedData ? (state.noSearchData = true) : (state.noSearchData = false);

    return { ...state, filterdData: searchedData };
  }

  if (action.type === "FILTER") {
    let dataAfterFiltered = [];
    let filterType = action.payload.filterType; //name (gener)
    let filterName = action.payload.filterName; //Ascending(role-playing-games-rpg)
    let passedData = action.payload.data; //filterData (allgames)
    let name = action.payload.title; //RPG

    if (filterType === "platform") {
      dataAfterFiltered = passedData.filter((game) =>
        game.platforms.find((platform) => platform.platform.name === filterName)
      );
      name = filterName;
    }

    if (filterType == "name") {
      if (filterName == "Ascending") {
        dataAfterFiltered = passedData.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else {
        dataAfterFiltered = passedData.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
    }

    if (filterType == "popularity") {
      if (filterName == "Ascending") {
        dataAfterFiltered = passedData.sort(
          (a, b) => a.metacritic - b.metacritic
        );
      } else {
        dataAfterFiltered = passedData.sort(
          (a, b) => b.metacritic - a.metacritic
        );
      }
    }

    if (filterType == "rate") {
      if (filterName == "Ascending") {
        dataAfterFiltered = passedData.sort((a, b) => a.rating - b.rating);
      } else {
        dataAfterFiltered = passedData.sort((a, b) => b.rating - a.rating);
      }
    }
    if (filterType == "date") {
      dataAfterFiltered = passedData?.sort((a, b) => {
        const dateA = new Date(a.released);
        const dateB = new Date(b.released);

        console.log(a.releases); //2021-03-26
        console.log(dateA); //Thu Apr 01 2021 03:00:00 GMT+0300 (East Africa Time)

        if (filterName === "Ascending") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
    }

    if (filterType === "gener") {
      //console.log(filterName);

      if (name === "All") {
        return {
          ...state,
          filterdData: state.allGames,
          gameTitle: name,
        };
      }

      dataAfterFiltered = passedData.filter((item) => {
        return item.genres.find((genre) => genre.slug === filterName);
      });
    }

    return {
      ...state,
      filterdData: dataAfterFiltered,
      gameTitle: name,
    };
  }

  if (action.type === "LOGIN") {
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    return {
      ...state,
      isLoggedIn: true,
    };
  }

  if (action.type === "LOGOUT") {
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    return {
      ...state,
      isLoggedIn: false,
    };
  }

  if (action.type === "TOOGLE_TRUE") {
    return {
      ...state,
      toogle: true,
    };
  }

  if (action.type === "TOOGLE_FALSE") {
    return {
      ...state,
      toogle: false,
    };
  }

  if (action.type === "ADD_TO_CART") {
    const name = action.name;
    const price = action.price + 0.99;
    const image = action.image;

    const existingProduct = state.cart?.find((game) => game.name === name);

    if (existingProduct) {
      const updatedCart = state.cart.map((game) =>
        game.name === name ? { ...game, count: game.count + 1 } : game
      );
      let newTotalPrice = 0;

      updatedCart.map((singleGame) => {
        newTotalPrice += singleGame.price * singleGame.count;
      });

      console.log(newTotalPrice);

      //update the cart data in localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      localStorage.setItem("totalPrice", JSON.stringify(newTotalPrice));
      return {
        ...state,
        cart: updatedCart,
        totalPrice: newTotalPrice,
      };
    } else {
      const newItem = {
        image: image,
        name: name,
        price: price,
        count: 1,
      };
      let newTotalPrice = state.totalPrice;

      newTotalPrice += newItem.price;

      const updatedCart = [...state.cart, newItem];

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      localStorage.setItem("totalPrice", JSON.stringify(newTotalPrice));

      return {
        ...state,
        cart: updatedCart,
        totalPrice: newTotalPrice,
      };
    }
  }
  if (action.type == "INCREMENT_CART") {
    let newTotalPrice = 0;
    //console.log(action.name)
    let name = action.name;

    const newFilterdData = state.cart?.map((game) =>
      game.name === name ? { ...game, count: game.count + 1 } : game
    );

    newFilterdData.map((game) => {
      newTotalPrice += game.price * game.count;
    });

    localStorage.setItem("cart", JSON.stringify(newFilterdData));
    localStorage.setItem("totalPrice", JSON.stringify(newTotalPrice));

    return {
      ...state,
      cart: newFilterdData,
      totalPrice: newTotalPrice,
    };
  }
  if (action.type == "DECREMENT_CART") {
    let newTotalPrice = 0;

    const newFilterdData = state.cart?.map((game) =>
      game.name === action.name && game.count > 1
        ? { ...game, count: game.count - 1 }
        : game
    );

    newFilterdData.forEach((game) => {
      newTotalPrice += game.price * game.count;
    });

    console.log(newTotalPrice);
    console.log("Json Updated");

    localStorage.setItem("cart", JSON.stringify(newFilterdData));

    localStorage.setItem("totalPrice", JSON.stringify(newTotalPrice));
    //Return a new state object with the updated cart and total price
    return {
      ...state,
      cart: newFilterdData, //updated the cart with the filtered and modified data
      totalPrice: newTotalPrice, //updated the total price in the state
    };
  }
  if (action.type === "CLEAR") {
    localStorage.removeItem("cart");
    localStorage.removeItem("totalPrice");
    return {
      ...state,
      cart: [],
      totalPrice: 0,
    };
  }
  
  if (action.type === "REMOVE") {
    let name = action.payload;
    let newTotalPrice = 0;

    const allWithoutSameID = state.cart?.filter((game) => game.name !== name);

    allWithoutSameID.map((game) => {
      newTotalPrice += game.price * game.count;
    });

    localStorage.setItem("cart", JSON.stringify(allWithoutSameID));

    localStorage.setItem("totalPrice", JSON.stringify(newTotalPrice));

    return {
      ...state,
      cart: allWithoutSameID,
      totalPrice: newTotalPrice,
    };
  }
};
export default reducer;
