export const validateFullName = (fullName, lastName) => {
    const regex = /^[a-zA-ZñáéíóúÁÉÍÓÚ\s]+$/;
    return (
        fullName.trim() !== "" &&
        lastName.trim() !== "" &&
        regex.test(fullName) &&
        regex.test(lastName) &&
        !/\d/.test(fullName) &&
        !/\d/.test(lastName)
    );
};