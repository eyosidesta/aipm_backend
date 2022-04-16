exports.added_error = (type) => {
    return `Error found, unable to add New ${type}`;
}

exports.found_error = (type) => {
    return `Error found, unable to fetch ${type}`;
}

exports.found_by_id_error = (type, id) => {
    return `Error found, unable to fetch ${type} by id of ${id}`;
}

exports.error_404 = (type) => {
    return `${type} is not found`;
}

exports.updated_error = (type) => {
    return `Error found, unable to update ${type}`;
}

exports.delete_error = (type) => {
    return `Error found, unable to delete ${type}`
}