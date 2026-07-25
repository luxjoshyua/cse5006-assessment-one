import { NextResponse } from "next/server"

export type ApiResponse<T> =
  { data: T; error: null } | { data: null; error: string }

export function ok<T>(data: T, status = 200) {
  return NextResponse.json<ApiResponse<T>>({ data, error: null }, { status })
}

export function fail(error: string, status = 400) {
  return NextResponse.json<ApiResponse<never>>(
    { data: null, error },
    { status },
  )
}
