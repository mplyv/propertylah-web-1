// EXPERIMENTAL
import { favoritesActions } from "./favorites-slice";

const saveFavToDB = async (id, token, favIds) => {
  try {
    await fetch(`http://68.183.183.118:4088/api/v1/users/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorites: `${favIds}` }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const addToFavorites = (id) => {
  return (dispatch, getState) => {
    const state = getState();
    const favIdsCopy = [...state.favorites.favIds];

    if (favIdsCopy.includes(id)) return;
    favIdsCopy.push(id);

    saveFavToDB(state.auth.id, state.auth.token, favIdsCopy)
      .then(() => {
        dispatch(favoritesActions.saveFavorites(favIdsCopy));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const removeFromFavorites = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    let favIdsCopy = [...state.favorites.favIds];

    if (!favIdsCopy.includes(id)) return;
    favIdsCopy = favIdsCopy.filter((favId) => favId !== id);

    saveFavToDB(state.auth.id, state.auth.token, favIdsCopy)
      .then(() => {
        dispatch(favoritesActions.saveFavorites(favIdsCopy));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchFavorites = () => {
  return async (dispatch, getState) => {
    const state = getState();

    if (!state.auth.isAuthenticated) {
      console.log("not yet auth, can't fetch favorites");
      return;
    }

    console.log("Loading favorites...");

    try {
      const res = await fetch(`http://68.183.183.118:4088/api/v1/users/me`, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          "Content-Type": "application/json",
        },
      });

      const user = await res.json();

      const loadedFavIds = user.data.favorites.split(",").map((element) => {
        return Number(element);
      });

      dispatch(favoritesActions.saveFavorites(loadedFavIds));
    } catch (error) {
      console.log(error);
    }
  };
};
