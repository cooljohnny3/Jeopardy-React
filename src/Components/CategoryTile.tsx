// Tile for a category

import * as React from 'react'

export interface CategoryTileProps { category: string };

export function CategoryTile(props: CategoryTileProps) {
    return <div className="categorytile">{props.category}</div>
}