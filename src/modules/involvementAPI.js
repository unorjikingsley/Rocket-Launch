import Comment from './comment.js';
import Reserve from './reserve.js';

export default class InvolvementAPI {
  static commentsURL =
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/1t7BiC343viu9RJP3IIx/comments'

  static likesURL =
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/1t7BiC343viu9RJP3IIx/likes'

  static reserveURL =
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/1t7BiC343viu9RJP3IIx/reservations'

  static fetchComments = async (launchId) => {
    const comments = [];
    await fetch(`${InvolvementAPI.commentsURL}?item_id=${launchId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        json.forEach((c) => {
          comments.push(new Comment(c.username, c.creationDate, c.comment));
        });
      });
    return comments;
  }

  static postComment = async (launchId, newcomment) => {
    await fetch(InvolvementAPI.commentsURL, {
      method: 'POST',
      body: JSON.stringify({
        item_id: launchId,
        username: newcomment.username,
        comment: newcomment.comment,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  static fetchAllLikes = async () => fetch(InvolvementAPI.likesURL).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })

  static postLike = async (launchId) => {
    await fetch(InvolvementAPI.likesURL, {
      method: 'POST',
      body: JSON.stringify({
        item_id: launchId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  static getReservation = async (launchId) => {
    const reserves = [];
    await fetch(`${InvolvementAPI.reserveURL}?item_id=${launchId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        json.forEach((c) => {
          reserves.push(new Reserve(c.username, c.dateStart, c.dateEnd));
        });
      });
    return reserves;
  }

  static postReservation = async (launchId, newreservation) => {
    await fetch(InvolvementAPI.reserveURL, {
      method: 'POST',
      body: JSON.stringify({
        item_id: launchId,
        username: newreservation.username,
        dateStart: newreservation.dateStart,
        dateEnd: newreservation.dateEnd,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }
}
