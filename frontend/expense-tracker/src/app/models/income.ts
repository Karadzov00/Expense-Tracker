// const incomeSchema = new mongoose.Schema({
//     id:Number,
//     date: {
//       type: Date,
//     },
//     source: {
//       type: String,
//     },
//     amount: {
//       type: Number,
//     }
//   });

export class Income{
    id:number;
    date:Date;
    source:string;
    amount:number;
    currency: string;
}