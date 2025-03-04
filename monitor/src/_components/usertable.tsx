'use client';

import React from 'react';
import { useReactTable, getCoreRowModel, getExpandedRowModel } from '@tanstack/react-table';

// Sample data for the parent table (ESG Dimensions)
const dimensionData = [
  {
    id:1,
    dimension: 'ENVIRONMENT',
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
    dimension: 'SOCIAL CAPITAL',
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
    header: <div>
                  <p className='text-ssindex-graph-grey'>No Data</p>
            </div>,
    accessorKey: 'noData'
  },
  {
    header: <div>
                  <p className='text-ssindex-poor'>Poor</p>
                  <p className='text-dark text-xs font-normal'>0-19%</p>
            </div>,
    accessorKey: 'poor'
  },
  {
    header: <div>
                  <p className='text-ssindex-low'>Low</p>
                  <p className='text-dark text-xs font-normal'>20-39%</p>
            </div>,
    accessorKey: 'low'
  },
  {
    header: <div>
                  <p className='text-ssindex-average'>Average</p>
                  <p className='text-dark text-xs font-normal'>40-59%</p>
            </div>,
    accessorKey: 'average'
  },
  {
    header: <div>
                  <p className='text-ssindex-good'>Good</p>
                  <p className='text-dark text-xs font-normal'>60-79%</p>
            </div>,
    accessorKey: 'good'
  },
  {
    header: <div>
                  <p className='text-ssindex-excellent'>Excellent</p>
                  <p className='text-dark text-xs font-normal'>80-100%</p>
            </div>,
    accessorKey: 'excellent'
  },
  {
    header: <div>
                  <p className='text-dark'>Score</p>
            </div>,
    accessorKey: 'score'
  },
  {
    header: <div>
                  <p className='text-dark'>Percentile</p>
                  <p className='text-dark text-xs font-normal'>Industry, Country</p>
            </div>,
    accessorKey: 'percentile'
  },
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
              {headerGroup.headers.map((header, i) => {
                
                if (i === 0) {
                  return (
                    <th key={header.id} className='bg-ssindex-table-header-gray text-primary rounded-l-lg' style={{ padding: '8px', textAlign: 'center' }}>
                      {header.isPlaceholder ? null : header.column.columnDef.header}
                    </th>
                  )
                }

                if (i === 1) {
                  return (
                    <th key={header.id} className='bg-ssindex-table-header-gray text-primary' style={{ padding: '8px', textAlign: 'left' }}>
                      {header.isPlaceholder ? null : header.column.columnDef.header}
                    </th>
                  )
                }
                
                else if (i === headerGroup.headers.length - 1) {
                  return (
                    <th key={header.id} className='bg-ssindex-table-header-gray text-primary rounded-r-lg' style={{ padding: '8px', textAlign: 'center' }}>
                      {header.isPlaceholder ? null : header.column.columnDef.header}
                    </th>
                  )
                }

                else {
                  return (
                    <th key={header.id} className='bg-ssindex-table-header-gray text-primary' style={{ padding: '8px', textAlign: 'center' }}>
                      {header.isPlaceholder ? null : header.column.columnDef.header}
                    </th>
                  )
                }
            })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <React.Fragment key={row.id}>
              <tr
                onClick={row.getToggleExpandedHandler()}
                className={`hover:bg-neutral-200 ${row.getIsExpanded() ? 'bg-neutral-200' : 'bg-white'}`}
                // style={{ cursor: 'pointer', background: row.getIsExpanded() ? '#f0f0f0' : 'white' }}
              >
                {row.getVisibleCells().map((cell, i) => (
                  <td key={cell.id} className={`p-4 text-primary ${ i === 1 ? 'text-left' : 'text-center' }`}>
                    {/* {cell.column.columnDef.cell ? cell.renderCell() : cell.getValue()} */}
                    <div>
                      {cell.column.columnDef.cell ? cell.getValue() : cell.getValue()}
                    </div>
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