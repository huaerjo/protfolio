import Foundation
import AVFoundation
import CoreGraphics
import ImageIO
let width = 1280, height = 720, frames = 240
let url = URL(fileURLWithPath: FileManager.default.currentDirectoryPath + "/public/video/hero-ambient.mp4")
let writer = try AVAssetWriter(outputURL: url, fileType: .mp4)
let input = AVAssetWriterInput(mediaType: .video, outputSettings: [AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: width, AVVideoHeightKey: height, AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: 1400000]])
let adapter = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB, kCVPixelBufferWidthKey as String: width, kCVPixelBufferHeightKey as String: height, kCVPixelBufferCGImageCompatibilityKey as String: true, kCVPixelBufferCGBitmapContextCompatibilityKey as String: true])
writer.add(input); writer.startWriting(); writer.startSession(atSourceTime: .zero)
let space = CGColorSpaceCreateDeviceRGB()
for frame in 0..<frames {
 while !input.isReadyForMoreMediaData { Thread.sleep(forTimeInterval: 0.005) }
 var optional: CVPixelBuffer?
 CVPixelBufferPoolCreatePixelBuffer(nil, adapter.pixelBufferPool!, &optional)
 let buffer = optional!; CVPixelBufferLockBaseAddress(buffer, [])
 let ctx = CGContext(data: CVPixelBufferGetBaseAddress(buffer), width: width, height: height, bitsPerComponent: 8, bytesPerRow: CVPixelBufferGetBytesPerRow(buffer), space: space, bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue)!
 ctx.setFillColor(CGColor(red: 0.022, green: 0.032, blue: 0.065, alpha: 1));ctx.fill(CGRect(x:0,y:0,width:width,height:height))
 let t = Double(frame) / Double(frames) * 2 * Double.pi
 for j in 0..<4 {
  let k = Double(j)
  let x = 860 + sin(t+k*1.5)*160, y = 370 + cos(t+k)*140
  let colors = [CGColor(red:0.13+k*0.025,green:0.24-k*0.025,blue:0.68,alpha:0.28),CGColor(red:0.04,green:0.09,blue:0.28,alpha:0)] as CFArray
  let gradient = CGGradient(colorsSpace:space,colors:colors,locations:[0,1])!
  ctx.drawRadialGradient(gradient,startCenter:CGPoint(x:x,y:y),startRadius:0,endCenter:CGPoint(x:x,y:y),endRadius:460,options:[])
 }
 ctx.saveGState();ctx.translateBy(x:910,y:365);ctx.rotate(by: -0.38 + sin(t)*0.09)
 for i in 0..<12 {
  ctx.setStrokeColor(CGColor(red:0.40,green:0.55,blue:0.94,alpha:0.09+Double(i)*0.007));ctx.setLineWidth(1)
  let inset=Double(i)*8
  ctx.strokeEllipse(in:CGRect(x:-310+inset,y:-245+inset,width:620-inset*2,height:490-inset*2))
 }
 ctx.restoreGState()
 if frame == 0, let cg = ctx.makeImage(), let destination = CGImageDestinationCreateWithURL(URL(fileURLWithPath:FileManager.default.currentDirectoryPath+"/public/video/hero-poster.png") as CFURL,"public.png" as CFString,1,nil) {CGImageDestinationAddImage(destination,cg,nil);CGImageDestinationFinalize(destination)}
 CVPixelBufferUnlockBaseAddress(buffer,[])
 adapter.append(buffer,withPresentationTime:CMTime(value:Int64(frame),timescale:24))
}
input.markAsFinished();let semaphore=DispatchSemaphore(value:0);writer.finishWriting{semaphore.signal()};semaphore.wait()
if writer.status != .completed {fatalError(String(describing:writer.error))}
print("Created 10-second looping H.264 video")
