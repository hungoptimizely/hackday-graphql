import {gql} from '@apollo/client';

const GET_SUPERHEROES = gql`
query superheroes($where: SuperheroFilterInput){
    superheroes (where: $where){
        id,
        name,
        description,
        height
        superpowers(order: {name:DESC}){
            id,
            name,
            description
        },
        movies{
            id,
            title,
            description,
            instructor,
            releaseDate
        }
    }
}
`

const ADD_SUPERHERO = gql`
mutation AddSuperhero($superheroAdd: SuperheroAddInput!){
    addSuperhero(superheroAdd: $superheroAdd){
        id,
        name,
        description,
        height
        superpowers(order: {name:DESC}){
            id,
            name,
            description
        },
        movies{
            id,
            title,
            description,
            instructor,
            releaseDate
        }
    }
}
`

const UPDATE_SUPERHERO = gql`
mutation UpdateSuperhero($superheroUpdate: SuperheroUpdateInput!){
    updateSuperhero(superheroUpdate: $superheroUpdate){
        id,
        name,
        description,
        height
        superpowers(order: {name:DESC}){
            id,
            name,
            description
        },
        movies{
            id,
            title,
            description,
            instructor,
            releaseDate
        }
    }
}
`

const DELETE_SUPERHERO = gql`
mutation RemoveSuperhero($superheroId: UUID!){
    removeSuperhero(superheroId: $superheroId)
}
`

export { GET_SUPERHEROES, ADD_SUPERHERO, UPDATE_SUPERHERO, DELETE_SUPERHERO }