// import AppError from "@/errors/AppError"
// import { IToken } from "@/models/token"
// import tokenService from "@/services/token"
// import { NextRequest } from "next/server"

// export async function getAuth(
//     req: NextRequest
// ): Promise<{ token: IToken }> {
//     const authHeader = req.headers.get('Authorization')
//     const apiKey = req.headers.get('x-api-key')
//     const cookieToken = req.cookies.get('accessToken')?.value  // Check for HttpOnly cookie

//     const tokenId = (() => {
//         if (authHeader?.startsWith("Bearer ")) {
//             return authHeader.split(" ")[1]
//         } else if (apiKey) {
//             return apiKey
//         } else if (cookieToken) {
//             return cookieToken
//         } else {
//             throw new AppError(
//                 'Unauthorized: missing token, API key, or cookie',
//                 403,
//                 true,
//             )
//         }
//     })()

//     const token: IToken = await tokenService.getById(tokenId)

//     return { token }
// }
