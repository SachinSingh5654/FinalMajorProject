const Listing = require("../models/listing");

module.exports.index = async (req, res, next) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("./listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Post does not exist");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
    // let {title, description, image, price, country, location} = req.body;
    // let listing = req.body.listing;
    // const newListing = new Listing(listing);
    // await newListing.save();
    
    // console.log("Request Body:", req.body); // Check if listing data is being sent
    // console.log("Request File:", req.file); // Check if file is being uploaded
    // const validCategories = ["Trending", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic", "Domes", "Boats"];


    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    // newListing.image = { url, filename};
    newListing.image.url = url;
    newListing.image.filename = filename;
    console.log(newListing);
    await newListing.save();
    // req.flash("success", "Congratulation, New Listing Created");
    req.flash("success", "Congratulation, New Post Created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Sorry, Post you requested for does not exist.");
        res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_200")
    res.render("./listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Updated Successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Post deleted!");
    res.redirect("/listings");
};

module.exports.renderSearchedListing = async (req, res) => {
    const searchQuery = req.query.searchedQuery?.trim();
    console.log(searchQuery);

    if (!searchQuery || searchQuery.length < 3) {
        req.flash("error", "Search some valid post!");
        return res.redirect("/listings");
    }

    const results = await Listing.find({
        $or: [
            { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search in title
            { location: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search in location
            { country: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search in country
            { category: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search in category
        ],
    });

    // Send the results back to the client
    res.render("./listings/searchedListing.ejs", { results });
};

// module.exports.renderSearchedFacility = async (req, res) => {
//     let { searchedFacility } = req.params;
//     console.log(searchedFacility);
//     res.send("working");
// };

// module.exports.renderSearchedFacility = async (req, res) => {
//     const { searchedFacility } = req.params;
//     console.log(searchedFacility);
//     res.send(`You searched for: ${searchedFacility}`);
// };

// module.exports.renderSearchedFacility = async (req, res) => {
//     const { searchedFacility } = req.params;
//     console.log(searchedFacility);

//     if (searchedFacility == null) {
//         req.flash("error", "Search some valid list!");
//         return res.redirect("/listings");
//     }

//     const results = await Listing.find({
//         $or: [
//             { category: { $regex: searchedFacility, $options: 'i' } }, // Case-insensitive search in category
//         ],
//     });
//     if (results.length === 0) {
//         req.flash("error", "No post exists you searched for. Thankyou");
//         return res.redirect("/listings");
//     }
//     res.render("./listings/searchedFacility.ejs", { results });
// };

module.exports.renderSearchedFacility = async (req, res) => {
    const { searchedFacility } = req.params;

    if (!searchedFacility) {
        req.flash("error", "Search some valid post!");
        return res.redirect("/listings");
    }

    const results = await Listing.find({
        $or: [
            { category: { $regex: searchedFacility, $options: 'i' } }, // Case-insensitive search in category
        ],
    });

    if (results.length === 0) {
        req.flash("error", "No post exists for the searched category. Thank you!");
        return res.redirect("/listings");
    }
    res.render("./listings/searchedFacility.ejs", { results });
};