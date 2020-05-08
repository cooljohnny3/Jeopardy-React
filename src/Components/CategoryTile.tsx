// Tile for a category

import * as React from 'react'

import { Category } from '../Data';

export interface CategoryTileProps { category: Category };

export function CategoryTile(props: CategoryTileProps) {
    return <div className="categorytile">{props.category.title}</div>
}