function isEqual(a: any, b: any): boolean {
    // Check the object type and compare if they are directly equal
    if (a === b) {
        return true;
    }

    // Check if both inputs are objects and neither are null (typeof null is also 'object')
    if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
        return false;
    }

    // Get keys of both objects
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    // If number of properties is different, objects are not equivalent
    if (keysA.length !== keysB.length) {
        return false;
    }

    // Sort keys to ensure they are in the same order for comparison
    keysA.sort();
    keysB.sort();

    // Check if key sets are the same
    for (let i = 0; i < keysA.length; i++) {
        if (keysA[i] !== keysB[i]) {
            return false;
        }
    }

    // Recursively check each property in 'a' against 'b'
    for (let key of keysA) {
        if (!isEqual(a[key], b[key])) {
            return false;
        }
    }

    // If all checks are passed, objects are considered equivalent
    return true;
}

export default isEqual;

