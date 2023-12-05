const transformData = (data, output) => {
  return data.map((elm) => {
    switch (output) {
      case 'transactions':
      case 'transactionsLimit':
        return {
          ID: elm._id,
          User: elm.user,
          Hotel: elm.hotel.name,
          Room: elm.rooms
            .reduce((acc, room) => {
              return [...acc, ...room.number];
            }, [])
            .join(', '),
          Date: `${new Date(elm.startDate).toLocaleDateString()} - ${new Date(
            elm.endDate
          ).toLocaleDateString()}`,
          Price: `$${elm.price}`,
          'Payment Method': elm.payment.replace(/(^[a-z]|\s[a-z])/g, (char) =>
            char.toUpperCase()
          ),
          Status: elm.status,
        };

      case 'hotels':
        return {
          ID: elm._id,
          Name: elm.name,
          Type: elm.type,
          Title: elm.name,
          City: elm.city,
        };
      case 're-hotels':
        return {
          name: elm.Name,
          type: elm.Type,
          title: elm.Title,
          city: elm.City,
        }

      case 'users':
        return {
          ID: elm._id,
          Username: elm.username,
          Fullname: elm?.fullname || '',
          'Phone Number': elm?.phoneNumber || '',
          Email: elm?.email || '',
        };

      case 'rooms':
        return {
          ID: elm._id,
          Title: elm.title,
          Description: elm.desc,
          Price: elm.price,
          'Max People': elm.maxPeople,
        };
      case 're-rooms':
        return {
          title: elm.Title,
          desc: elm.Description,
          price: elm.Price,
          maxPeople: elm['Max People'],
        }

      default:
        return null;
    }
  });
};

export default transformData