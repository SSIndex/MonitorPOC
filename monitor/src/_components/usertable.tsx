'use client';

import React from 'react';
import { useReactTable, getCoreRowModel, getExpandedRowModel } from '@tanstack/react-table';

// Sample data for the parent table (ESG Dimensions)
const dimensionData = [
  {
    id: 1,
    dimension: 'Environmental',
    noData: 5,
    poor: 15,
    low: 25,
    average: 45,
    good: 65,
    excellent: 85,
    score: 62,
    percentile: 75,
    orders: [
      { orderId: 'O1', item: 'Laptop', price: 1200 },
      { orderId: 'O2', item: 'Mouse', price: 25 },
    ],
  },
  {
    id: 2,
    dimension: 'Social',
    noData: 10,
    poor: 18,
    low: 30,
    average: 50,
    good: 70,
    excellent: 90,
    score: 45,
    percentile: 60,
    orders: [
      { orderId: 'O3', item: 'Monitor', price: 300 },
    ],
  },
];

// Columns for the parent table
const dimensionColumns = [
  { header: '#', accessorKey: 'id' },
  { header: 'Dimension', accessorKey: 'dimension' },
  {
    header: 'No Data',
    accessorKey: 'noData',
    cell: ({ getValue }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '20px', height: '20px', background: '#ccc' }}></div>
        {getValue()}%
      </div>
    ),
  },
  {
    header: 'Poor 0-19%',
    accessorKey: 'poor',
    cell: ({ getValue }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '20px', height: '20px', background: '#ff4d4f' }}></div>
        {getValue()}%
      </div>
    ),
  },
  {
    header: 'Low 20-39%',
    accessorKey: 'low',
    cell: ({ getValue }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '20px', height: '20px', background: '#ffbb33' }}></div>
        {getValue()}%
      </div>
    ),
  },
  {
    header: 'Average 40-59%',
    accessorKey: 'average',
    cell: ({ getValue }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '20px', height: '20px', background: '#ffeb3b' }}></div>
        {getValue()}%
      </div>
    ),
  },
  {
    header: 'Good 60-79%',
    accessorKey: 'good',
    cell: ({ getValue }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '20px', height: '20px', background: '#4caf50' }}></div>
        {getValue()}%
      </div>
    ),
  },
  {
    header: 'Excellent 80-100%',
    accessorKey: 'excellent',
    cell: ({ getValue }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '20px', height: '20px', background: '#2196f3' }}></div>
        {getValue()}%
      </div>
    ),
  },
  { header: 'Score', accessorKey: 'score' },
  { header: 'Percentile Industry', accessorKey: 'percentile' },
];

// Main component with parent table
export function UserTable() {
  const table = useReactTable({
    data: dimensionData,
    columns: dimensionColumns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true, // All rows can expand
  });

  return (
    <div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>
                  {header.isPlaceholder ? null : header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <React.Fragment key={row.id}>
              <tr
                onClick={row.getToggleExpandedHandler()}
                style={{ cursor: 'pointer', background: row.getIsExpanded() ? '#f0f0f0' : 'white' }}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} style={{ border: '1px solid black', padding: '8px' }}>
                    {/* {cell.column.columnDef.cell ? cell.renderCell() : cell.getValue()} */}
                    {cell.column.columnDef.cell ? cell.getValue() : cell.getValue()}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && (
                <tr>
                  <td colSpan={row.getVisibleCells().length} style={{ padding: '0' }}>
                    <NestedOrderTable orders={row.original.orders} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Nested table component for orders (unchanged)
function NestedOrderTable({ orders }) {
  const orderColumns = [
    { header: 'Order ID', accessorKey: 'orderId' },
    { header: 'Item', accessorKey: 'item' },
    { header: 'Price ($)', accessorKey: 'price' },
  ];

  const table = useReactTable({
    data: orders,
    columns: orderColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ padding: '10px', background: '#f9f9f9' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} style={{ border: '1px solid gray', padding: '6px', background: '#ddd' }}>
                  {header.isPlaceholder ? null : header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} style={{ border: '1px solid gray', padding: '6px' }}>
                  {cell.getValue()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}